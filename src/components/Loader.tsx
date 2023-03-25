import styles from "@styles/components/loader.module.scss";

interface Props {
  dataTestId?: string;
}

const Loader: React.FC<Props> = ({ dataTestId = "loader" }) => {
  return <span data-testid={dataTestId} className={styles.loader}></span>;
};

export default Loader;
