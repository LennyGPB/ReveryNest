import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { aiPrompt, aiPromptLucidSignals } from './ai_prompt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService, private cloudinaryService: CloudinaryService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyzeDream(content: string): Promise<any> {
    try {

      const safeContent = content.slice(0, 1500);

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: aiPrompt },
          { role: "user", content: safeContent }
        ],
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content || '{}');

    } catch (error) {

      console.error("AI analyzeDream error:", error);

      return {
        intensity: 3,
        tags: [],
        summary: null
      };
    }
  }

  async transcribeAudio(file: Express.Multer.File): Promise<string> {
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException("Fichier audio trop volumineux");
    }

    try {
      const transcription = await this.openai.audio.transcriptions.create({
        file: await OpenAI.toFile(file.buffer, file.originalname),
        model: "whisper-1",
        language: "fr",
      });

      return transcription.text;
    } catch (error) {
      console.error("Erreur Whisper:", error);
      throw new BadRequestException("Échec de la transcription audio");
    }
  }

  async generateDreamImage(dreamContent: string): Promise<string> {

    try {

      const safeDream = dreamContent.slice(0, 1000);

      const prompt = `Create a cinematic, poetic digital illustration inspired by this dream:
      "${safeDream}"

      Style: soft lighting, subtle shadows, emotional atmosphere, slightly surreal but grounded in reality.
      Color palette: deep blues, muted purples, warm golden highlights.
      Mood: introspective, calm, slightly mysterious.
      Composition: single main subject, clear focal point, minimal visual noise.
      No text, no distortion, no exaggerated fantasy elements.
      `;

      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1792",
      });

      if (!response.data || !response.data[0]) {
        throw new BadRequestException("Image generation failed");
      }

      const temporaryUrl = response.data[0].url;

      if (!temporaryUrl) {
        throw new BadRequestException("Image generation failed");
      }

      const permanentUrl =
        await this.cloudinaryService.uploadImageFromUrl(temporaryUrl);

      return permanentUrl;

    } catch (error) {

      console.error("Dream image generation error:", error);

      throw new BadRequestException(
        "Impossible de générer l'image pour ce rêve"
      );
    }
  }

  async analyseLucidRitual(signalsData: any): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: aiPromptLucidSignals
          },
          {
            role: "user",
            content: JSON.stringify(signalsData)
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;

      if (!content) {
        throw new Error("Empty AI response");
      }

      return JSON.parse(content);

    } catch (error) {
      console.error("Lucid Ritual AI error:", error);
      throw new InternalServerErrorException("AI ritual generation failed");
    }
  }
}