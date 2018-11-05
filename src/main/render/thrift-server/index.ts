import * as ts from 'typescript'

import {
    ConstDefinition,
    EnumDefinition,
    ExceptionDefinition,
    FunctionType,
    ServiceDefinition,
    StructDefinition,
    TypedefDefinition,
    UnionDefinition,
} from '@creditkarma/thrift-parser'

import { renderException as _renderException } from './exception'

import { renderService as _renderService } from './service'

import { fileUsesThrift } from '../shared/includes'
import { renderConst as _renderConst } from './const'
import { renderEnum as _renderEnum } from './enum'
import {
    renderIncludes as _renderIncludes,
    renderThriftImports,
} from './includes'
import { renderStruct as _renderStruct } from './struct'
import { renderTypeDef as _renderTypeDef } from './typedef'
import { renderUnion as _renderUnion } from './union'

import {
    IIdentifierMap,
    INamespaceFile,
    IRenderer,
} from '../../types'

import { typeNodeForFieldType } from './types'

export function renderIncludes(
    outPath: string,
    currentPath: string,
    resolvedFile: INamespaceFile,
): Array<ts.Statement> {
    if (fileUsesThrift(resolvedFile)) {
        return [
            renderThriftImports(),
            ..._renderIncludes(outPath, currentPath, resolvedFile),
        ]
    } else {
        return _renderIncludes(outPath, currentPath, resolvedFile)
    }
}

export function renderConst(statement: ConstDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return [ _renderConst(statement, (fieldType: FunctionType, loose?: boolean): ts.TypeNode => {
        return typeNodeForFieldType(fieldType, identifiers, loose)
    }) ]
}

export function renderTypeDef(statement: TypedefDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderTypeDef(statement, (fieldType: FunctionType, loose?: boolean): ts.TypeNode => {
        return typeNodeForFieldType(fieldType, identifiers, loose)
    }, identifiers)
}

export function renderEnum(statement: EnumDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return [ _renderEnum(statement) ]
}

export function renderStruct(statement: StructDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderStruct(statement, identifiers)
}

export function renderException(statement: ExceptionDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderException(statement, identifiers)
}

export function renderUnion(statement: UnionDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderUnion(statement, identifiers)
}

export function renderService(statement: ServiceDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return [ _renderService(statement, identifiers) ]
}

export const renderer: IRenderer = {
    renderIncludes,
    renderConst,
    renderTypeDef,
    renderEnum,
    renderStruct,
    renderException,
    renderUnion,
    renderService,
}
