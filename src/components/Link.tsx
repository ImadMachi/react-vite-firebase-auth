import styles from "@styles/components/link.module.scss";
import { Link as NativeLink } from "react-router-dom";

interface Props {
  children: JSX.Element | string;
  to: string;
}

const Link: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <NativeLink className={styles.link} {...rest}>
      {children}
    </NativeLink>
  );
};

export default Link;
