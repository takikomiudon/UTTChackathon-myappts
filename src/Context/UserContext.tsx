import { createContext, useState, ReactNode } from "react";

export type contextType = {};

export const UserContext = createContext<contextType|undefined>(undefined);

const { Provider } = UserContext;

interface Props {
  children: ReactNode
};

export const UserProvider = (props:Props) => {
  const { children } = props;
  
  const [userInfo,setUserInfo] = useState({
    nameId: "",
    contributionId: "",
    contributorId: "",
    point: 0,
    message: "",
  });

  return (
    <Provider value={{userInfo, setUserInfo}}>
      {children}
    </Provider>
  );
};

// export type ${PascalCase} = {};
// これ何のために定義したの 初期化するため。なんか知らんけど脳死でやっとけ

// export const ${camelCase}Context = createContext<
//   ${PascalCase} | undefined
// >(undefined);
// ここはコピペでいい

// const { Provider } = ${camelCase}Context;
// 何で{}なんですかー　JSXを書かない間のに鬱陶しいから

// interface ${PascalCase}ProviderProps {
//   children: ReactNode;
// }
// ここは一緒

// export const ${PascalCase}Provider: FC<${PascalCase}ProviderProps> = (
//   props,
// ) => {
//   const { children } = props;
  
//   // Define here

//   return (
//     <Provider value={{}}>
//       {children}
//     </Provider>
//   );
// };