interface Props {
    children: React.ReactNode;
  }
  
  export const Container = ({ children }: Props) => (
    <div>{children}</div>
  );