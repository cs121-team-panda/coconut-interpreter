// @flow

import * as React from 'react';

import styles from './Header.module.css';

type Props = {
  name: string,
  color: string,
  textColor: string,
  children: React.Element<any>,
};

const Header = ({ name, color, textColor, children }: Props) => (
  <div
    className={styles.header}
    style={{ backgroundColor: color, color: textColor }}
  >
    {name}
    {children}
  </div>
);

export default Header;
