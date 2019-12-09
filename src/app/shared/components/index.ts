import { BreadcrumbsComponent } from './breadcrumbs';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { LogoComponent } from './logo';
import { UserActionBarComponent } from './user-action-bar';
import { InputComponent } from './input';
import { SelectComponent } from './select';

export const sharedComponents = [
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  InputComponent,
  SelectComponent
];

export const privateComponents = [
  LogoComponent,
  UserActionBarComponent
];

export * from './select';
