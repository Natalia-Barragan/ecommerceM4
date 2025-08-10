import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import ENV from "config/environment";
import { Observable } from "rxjs";

/* function validate(request: Request){
    console.log(request.headers);
    return true;
} */
@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];
        if(!token) throw new UnauthorizedException('No se envió token');
        
        try{
            const secret = ENV.JWT_SECRET;
            const payload = this.jwtService.verify(token, { secret });

            payload.exp = new Date(payload.exp * 1000);
            request.user = payload;

            return true;
        }catch(error){
            throw new UnauthorizedException('Error al validar token');
        }
       
    }
}