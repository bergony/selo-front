import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnautohirzedToHome = () => redirectUnauthorizedTo('/');

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnautohirzedToHome,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnautohirzedToHome,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'manage-clips',
    redirectTo: 'manage',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
