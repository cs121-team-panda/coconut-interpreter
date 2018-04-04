// @flow

import * as React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  header: {
    height: '42px',
    padding: '0 24px',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: 3,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
});

type Props = {
  name: string,
  color: string,
  textColor: string,
  children: React.Element<any>,
  classes: $Call<typeof styles>,
};

const Header = (props: Props) => (
  <div
    className={props.classes.header}
    style={{ backgroundColor: props.color, color: props.textColor }}
  >
    {props.name}
    {props.children}
  </div>
);

export default withStyles(styles)(Header);
