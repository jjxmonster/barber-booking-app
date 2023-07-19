import * as React from "react";

import RegisterTabs from "components/shared/register-tabs";

const styles = {
  wrapper: "flex justify-center",
};

const Register = () => {
  return (
    <div className={styles.wrapper}>
      <RegisterTabs />
    </div>
  );
};

export default Register;
