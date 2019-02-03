const styles = theme => ({
  profileContainer: {
    background: 'white',
    padding: 50,
    marginLeft: 100,
    marginTop: 50,
    marginRight: 140,
    display: 'flex'
  },
  profileItemContainer: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 100,
    marginTop: 30
  },
  profileItems: {
    marginTop: 30
  },
  shareTitle: {
    color: theme.palette.primary.main,
    paddingLeft: 100,
    paddingTop: 100,
    fontSize: 40,
    fontWeight: 700
  },
  profileName: {
    fontSize: 30,
    fontWeight: 700
  },
  profileState: {
    fontSize: 20
  }
});

export default styles;
