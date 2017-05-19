import * as ts from 'typescript';

export function createIf(_comparison: ts.BinaryExpression | ts.CallExpression | ts.Identifier, _then?: ts.Statement | ts.Statement[], _else?: ts.Statement | ts.Statement[]) {
  let _thenBlock;
  if (_then) {
    _then = Array.isArray(_then) ? _then : [_then];
    _thenBlock = ts.createBlock(_then, true);
  }

  let _elseBlock;
  if (_else) {
    _else = Array.isArray(_else) ? _else : [_else];
    _elseBlock = ts.createBlock(_else, true);
  }

  return ts.createIf(_comparison, _thenBlock, _elseBlock);
}

export function createThrow(_ctor, _args) {
  const _err = ts.createNew(_ctor, undefined, _args);

  return ts.createThrow(_err);
}

export function createNotEquals(_left: ts.Expression, _right: ts.Expression) {
  return ts.createBinary(_left, ts.SyntaxKind.ExclamationEqualsToken, _right);
}

export function createVariable(_name: string | ts.Identifier, _init: ts.Expression) {
  const _varDec = ts.createVariableDeclaration(_name, undefined, _init);
  const _varDecList = ts.createVariableDeclarationList([_varDec], ts.NodeFlags.Const);

  return ts.createVariableStatement(undefined, _varDecList);
}

export function toOptional(option: string = '') {
  // This only works in certain cases, even if the methods take a questionToken as an argument
  switch(option.toUpperCase()) {
    case 'REQUIRED':
      // Ignore
      return;
    case 'OPTIONAL':
    default:
      return ts.createToken(ts.SyntaxKind.QuestionToken);
  }
}

export type Container = { name: string, keyType?: string, valueType: string};
export type Typedef = string | Container;

export function toAstType(typedef: Typedef) : ts.TypeNode {
  // This is all types as defined by the `thrift` node library
  switch(getEnumType(typedef)) {
    case 'BOOL':
      return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    case 'BYTE': // TODO: is this a number type?
    case 'I08': // TODO: is this a number type?
    case 'DOUBLE':
    case 'I16':
    case 'I32':
    case 'I64':
      return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    case 'STRING':
    case 'UTF7':
    case 'UTF8':
    case 'UTF16':
      return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case 'VOID': // TODO: does this need a type?
    case 'STRUCT':
      throw new Error('Not Implemented');
    case 'MAP':
      // TODO: a type alias for this would be nice
      if (typeof typedef === 'object') {
        const keyType = toAstType(typedef.keyType);
        const valueType = toAstType(typedef.valueType);
        const mapType = ts.createTypeReferenceNode('Map', [keyType, valueType]);
        const tupleArrayType = ts.createArrayTypeNode(ts.createTupleTypeNode([keyType, valueType]));
        return ts.createUnionTypeNode([mapType, tupleArrayType]);
      }
      throw new Error('Invalid Map type definition');
      // return ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    case 'LIST':
      // TODO: maybe an interface?
      if (typeof typedef === 'object') {
        return ts.createArrayTypeNode(toAstType(typedef.valueType));
      }
      throw new Error('Invalid List type definition');
    case 'SET':
      // TODO: maybe an interface?
      if (typeof typedef === 'object') {
        return ts.createArrayTypeNode(toAstType(typedef.valueType));
      }
      throw new Error('Invalid Set type definition');
    default:
      return;
  }
}

export function getType(typedef: Typedef) : string {
  if (typeof typedef === 'string') {
    return typedef;
  }
  return typedef.name;
}

export function getEnumType(typedef: Typedef) {
  return getType(typedef).toUpperCase();
}