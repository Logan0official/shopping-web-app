import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../shared/service/user.service";
import { AuthService } from "../shared/service/auth.service";
import { User } from "../shared/model/user.model";
import { NbIconConfig, NbToastrService } from '@nebular/theme';
declare var $: any;
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  providers: [EmailValidator],
})
export class AuthComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: "",
  };

  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {
    this.createUser = new User();
  }

  ngOnInit() { }

  addUser(userForm: NgForm) {
    userForm.value["isAdmin"] = false;
    this.authService
      .createUserWithEmailAndPassword(
        userForm.value["emailId"],
        userForm.value["password"]
      )
      .then((res) => {
        const user = {
          email: res.user.email,
          uid: res.user.uid,
        };

        this.userService.createUser(user);

        const iconConfig: NbIconConfig = { icon: 'unlock-outline', pack: 'eva' };
        this.toastrService.success('', `User Registeration!`, iconConfig);

        setTimeout((router: Router) => {
          $("#createUserForm").modal("hide");
          this.router.navigate(["/"]);
        }, 500);
      })
      .catch((err) => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        const iconConfig: NbIconConfig = { icon: 'alert-triangle-outline', pack: 'eva' };
        this.toastrService.danger('', err, iconConfig);
      });
  }

  signInWithEmail(userForm: NgForm) {
    this.authService
      .signInRegular(userForm.value["emailId"], userForm.value["loginPassword"])
      .then((res) => {
        const iconConfig: NbIconConfig = { icon: 'unlock-outline', pack: 'eva' };
        this.toastrService.success('', `Authentication Success!`, iconConfig);

        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "/"]);
        }, 500);

        this.router.navigate(["/"]);
      })
      .catch((err) => {
        const iconConfig: NbIconConfig = { icon: 'alert-triangle-outline', pack: 'eva' };
        this.toastrService.danger('', 'Invalid Credentials, Please Check your credentials!', iconConfig);
      });
  }
}
