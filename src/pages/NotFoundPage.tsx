import { Result } from "antd";

export const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};
