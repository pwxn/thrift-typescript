/* tslint:disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
export interface ICode {
    __name: "Code";
    status?: thrift.Int64;
}
export interface ICodeArgs {
    status?: number | string | thrift.Int64;
}
export const CodeCodec: thrift.IStructCodec<ICodeArgs, ICode> = {
    encode(args: ICodeArgs, output: thrift.TProtocol): void {
        const obj = {
            status: (typeof args.status === "number" ? new thrift.Int64(args.status) : typeof args.status === "string" ? thrift.Int64.fromDecimalString(args.status) : args.status)
        };
        output.writeStructBegin("Code");
        if (obj.status != null) {
            output.writeFieldBegin("status", thrift.TType.I64, 1);
            output.writeI64((typeof obj.status === "number" ? new thrift.Int64(obj.status) : typeof obj.status === "string" ? thrift.Int64.fromDecimalString(obj.status) : obj.status));
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): ICode {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.I64) {
                        const value_1: thrift.Int64 = input.readI64();
                        _args.status = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            __name: "Code",
            status: _args.status
        };
    }
};
export class Code implements thrift.IStructLike, ICode {
    public status?: thrift.Int64;
    public readonly __name = "Code";
    constructor(args: ICodeArgs = {}) {
        if (args.status != null) {
            const value_2: thrift.Int64 = (typeof args.status === "number" ? new thrift.Int64(args.status) : typeof args.status === "string" ? thrift.Int64.fromDecimalString(args.status) : args.status);
            this.status = value_2;
        }
    }
    public static read(input: thrift.TProtocol): Code {
        return new Code(CodeCodec.decode(input));
    }
    public static write(args: ICodeArgs, output: thrift.TProtocol): void {
        return CodeCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return CodeCodec.encode(this, output);
    }
}
