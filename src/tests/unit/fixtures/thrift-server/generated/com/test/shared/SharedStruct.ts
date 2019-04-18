/* tslint:disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
import * as __NAMESPACE__ from "./.";
export interface ISharedStruct {
    __name: "SharedStruct";
    code: __NAMESPACE__.ICode;
    value: string;
}
export interface ISharedStructArgs {
    code: __NAMESPACE__.ICodeArgs;
    value: string;
}
export const SharedStructCodec: thrift.IStructCodec<ISharedStructArgs, ISharedStruct> = {
    encode(args: ISharedStructArgs, output: thrift.TProtocol): void {
        const obj = {
            code: args.code,
            value: args.value
        };
        output.writeStructBegin("SharedStruct");
        if (obj.code != null) {
            output.writeFieldBegin("code", thrift.TType.STRUCT, 1);
            __NAMESPACE__.CodeCodec.encode(obj.code, output);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[code] is unset!");
        }
        if (obj.value != null) {
            output.writeFieldBegin("value", thrift.TType.STRING, 2);
            output.writeString(obj.value);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[value] is unset!");
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): ISharedStruct {
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
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_1: __NAMESPACE__.ICode = __NAMESPACE__.CodeCodec.decode(input);
                        _args.code = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.value = value_2;
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
        if (_args.code !== undefined && _args.value !== undefined) {
            return {
                __name: "SharedStruct",
                code: _args.code,
                value: _args.value
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read SharedStruct from input");
        }
    }
};
export class SharedStruct implements thrift.IStructLike, ISharedStruct {
    public code: __NAMESPACE__.ICode;
    public value: string;
    public readonly __name = "SharedStruct";
    constructor(args: ISharedStructArgs) {
        if (args.code != null) {
            const value_3: __NAMESPACE__.ICode = new __NAMESPACE__.Code(args.code);
            this.code = value_3;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[code] is unset!");
        }
        if (args.value != null) {
            const value_4: string = args.value;
            this.value = value_4;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[value] is unset!");
        }
    }
    public static read(input: thrift.TProtocol): SharedStruct {
        return new SharedStruct(SharedStructCodec.decode(input));
    }
    public static write(args: ISharedStructArgs, output: thrift.TProtocol): void {
        return SharedStructCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return SharedStructCodec.encode(this, output);
    }
}
