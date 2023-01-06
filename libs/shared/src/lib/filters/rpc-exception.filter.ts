import { ArgumentsHost, RpcExceptionFilter } from "@nestjs/common";
import { Catch } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(exception: RpcException, _host: ArgumentsHost): Observable<unknown> {
        return throwError(() => exception.getError())
    }
}