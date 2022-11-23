import { createContext, useState, ReactNode, useContext } from "react";

type User = {
  nameId: string;
  name: string;
  contributionId: string; 
  contributorId: string; 
  point: number; 
  message: string; 
};

export type contextType = { 
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>; 
  };

export const userContext = createContext<contextType|undefined>(undefined);

const { Provider } = userContext;

interface Props {
  children: ReactNode
};

export const UserProvider = (props:Props) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<User>({
    nameId: localStorage.getItem("nameid") == null ? "":String(localStorage.getItem("nameid")),
    name: localStorage.getItem("name") == null ? "":String(localStorage.getItem("name")),
    contributionId: "",
    contributorId: "",
    point: 0,
    message: "",
  })

  return (
    <Provider value={{userInfo, setUserInfo}}>
      {children}
    </Provider>
  );
};

type UseContextType = () => contextType;

export const useUserInfo: UseContextType = () => {
  const context = useContext(userContext);

  if (!context) throw new Error("WithoutProviderError");

  return context;
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