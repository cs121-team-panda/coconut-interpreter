// @flow

import * as React from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import GearIcon from '@material-ui/icons/Settings';
import Typography from 'material-ui/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Button from 'material-ui/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import ReactTooltip from 'react-tooltip';
import { withStyles } from 'material-ui/styles';
import type { Theme } from 'material-ui/styles';

import { editorHeaderColor, headerTextStyle } from '../constants';

const styles = (theme: Theme) => ({
  appBar: {
    backgroundColor: editorHeaderColor,
    boxShadow: 'none',
  },
  toolbarRoot: {
    minHeight: 48,
    padding: '0 24px',
  },
  headerText: {
    flex: 1,
    ...headerTextStyle,
  },
  runButton: {
    ...headerTextStyle,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  gearIcon: {
    fontSize: 20,
  },
  downloadIcon: {
    fontSize: 20,
  },
  tooltip: {
    fontFamily: 'Roboto',
    fontSize: 14,
    padding: theme.spacing.unit,
  },
});

type Props = {
  simple: boolean,
  appBarClassNames?: string,
  open?: boolean,
  handleDrawerOpen?: () => void,
  coconutCode?: string,
  handleClick: () => void,
  loading: boolean,
  classes: $Call<typeof styles>,
};

class EditorHeader extends React.Component<Props> {
  handleDownloadClick = code => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'coconut.coco';
    if (document.body) document.body.appendChild(element);
    element.click();

    // Timeout to prevent the element being removed too soon in some browsers like Firefox
    setTimeout(() => {
      if (document.body) document.body.removeChild(element);
      window.URL.revokeObjectURL(element.href);
    }, 100);
  };

  render() {
    const { simple, open, classes } = this.props;
    return (
      <AppBar className={simple ? classes.appBar : this.props.appBarClassNames}>
        <Toolbar
          classes={{ root: classes.toolbarRoot }}
          disableGutters={!simple && !open}
        >
          {!simple && (
            <>
              <ReactTooltip
                id="settings"
                className={classes.tooltip}
                place="right"
                type="dark"
                effect="solid"
              />
              <IconButton
                data-tip="Settings"
                data-for="settings"
                color="inherit"
                aria-label="open drawer"
                onClick={this.props.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <GearIcon className={classes.gearIcon} />
              </IconButton>
            </>
          )}
          <Typography
            variant="title"
            color="inherit"
            className={classes.headerText}
            noWrap
          >
            Coconut Editor
          </Typography>
          {!simple && (
            <>
              <ReactTooltip
                id="download"
                className={classes.tooltip}
                place="bottom"
                type="dark"
                effect="solid"
              />
              <IconButton
                data-tip="Download"
                data-for="download"
                color="inherit"
                onClick={() => this.handleDownloadClick(this.props.coconutCode)}
              >
                <SaveIcon className={classes.downloadIcon} />
              </IconButton>
            </>
          )}
          <ReactTooltip
            id="run"
            className={classes.tooltip}
            place="bottom"
            type="dark"
            effect="solid"
          />
          <Button
            data-tip="⌘ + Enter"
            data-for="run"
            color="inherit"
            className={classes.runButton}
            onClick={this.props.handleClick}
            disabled={this.props.loading}
          >
            Run
            <PlayArrow />
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(EditorHeader);
