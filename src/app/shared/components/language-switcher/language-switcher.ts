import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  currentLang = 'es';

constructor(private translate: TranslateService) {
  this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
}

switchLanguage(lang: string) {
  this.translate.use(lang);
  this.currentLang = lang;
}
}
