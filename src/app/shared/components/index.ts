import { BreadcrumbsComponent } from './breadcrumbs';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { LogoComponent } from './logo';
import { UserActionBarComponent } from './user-action-bar';
import { InputComponent } from './input';
import { SelectComponent } from './select';
import { InputErrorsComponent } from './input-errors';
import { DatepickerComponent } from './datepicker';
import { DurationInputComponent } from './duration-input';

export const sharedComponents = [
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  InputComponent,
  SelectComponent,
  DatepickerComponent,
  InputErrorsComponent,
  DurationInputComponent
];

export const privateComponents = [
  LogoComponent,
  UserActionBarComponent
];

export * from './select';
export * from './input-errors';
