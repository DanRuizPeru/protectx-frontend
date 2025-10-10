import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface SupportItem {
  title: string;
  text: string;
}

@Component({
  selector: 'app-frequent-questions',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './frequent-questions.html',
  styleUrl: './frequent-questions.css'
})
export class FrequentQuestions implements OnDestroy {
  private langSub!: Subscription;
  currentLang: 'es' | 'en';

  itemsEs: SupportItem[] = [
    {
      title: 'Asistencia técnica',
      text: 'Brindamos soporte remoto y presencial para resolver cualquier fallo técnico de tus dispositivos conectados.'
    },
    {
      title: 'Atención al cliente',
      text: 'Nuestro equipo de atención al cliente está disponible para ayudarte con dudas, reclamos o sugerencias.'
    },
    {
      title: 'Documentación',
      text: 'Accede a manuales, tutoriales y guías prácticas para aprovechar todas las funcionalidades del sistema.'
    },
    {
      title: 'Reportar un problema',
      text: 'Puedes enviarnos un reporte detallado de cualquier error o comportamiento inusual para que lo revisemos rápidamente.'
    }
  ];

  itemsEn: SupportItem[] = [
    {
      title: 'Technical Support',
      text: 'We provide remote and on-site support to resolve any technical issues with your connected devices.'
    },
    {
      title: 'Customer Service',
      text: 'Our customer service team is available to help you with questions, claims, or suggestions.'
    },
    {
      title: 'Documentation',
      text: 'Access manuals, tutorials, and practical guides to take full advantage of all system features.'
    },
    {
      title: 'Report a Problem',
      text: 'Send us a detailed report of any error or unusual behavior so we can review it quickly.'
    }
  ];

  items: SupportItem[] = [];

  constructor(private translate: TranslateService) {
    // idioma inicial
    this.currentLang = (this.translate.currentLang as 'es' | 'en') || 'en';
    this.updateItems();

    // suscribirse al cambio de idioma
    this.langSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang as 'es' | 'en';
      this.updateItems();
    });
  }

  private updateItems() {
    this.items = this.currentLang === 'es' ? this.itemsEs : this.itemsEn;
  }

  ngOnDestroy(): void {
    if (this.langSub) this.langSub.unsubscribe();
  }
}
