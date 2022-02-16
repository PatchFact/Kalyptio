import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

export const routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 20]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
