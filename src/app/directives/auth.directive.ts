import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[auth]'
})
export class AuthDirective {
  @Input() set auth(value: string | string[]) {
    const roles = this.getRolesFromLocalStorage(); // Retrieve roles from local storage
    // Check if any of the roles match the specified roles
    const hasRole = Array.isArray(value)
      ? (value as string[]).some(role => roles.includes(role))
      : roles.includes(value as string);

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {

  }

  private getRolesFromLocalStorage(): string[] {
    const rolesString = localStorage.getItem('roles');
    let roles: string[] = [];
    if (rolesString) {
      try {
        roles = JSON.parse(rolesString);
      } catch (error) {
        roles = [rolesString]; // Convert to array if not in array format
      }
    }
    return roles;
  }
}
