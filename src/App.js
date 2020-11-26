import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';
import PropTypes from 'prop-types';
import styles from './App.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
import Countries from './components/views/Countries/CountriesContainer';
import Regions from './components/views/Regions/RegionsContainer';
// TODO - import other views
import Info from './components/views/Info/Info';
import NotFound from './components/views/NotFound/NotFound';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';
import Country from './components/views/Country/CountryContainer';
import Trip from './components/views/Trip/TripContainer';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }
  
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translate(0,${styles.transform}px)`,
    };
  }

  render(){
    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch 
            // location={location}
            atEnter={{
              opacity: 0,
              transform: 200,
            }}
            atLeave={{
              opacity: 0,
              transform: 0,
            }}
            atActive={{
              opacity: 1,
              transform: 0,
            }}
            mapStyles={this.mapStyles}
            className={styles.switchWrapper}
          >
            <Route exact path='/' component={Home} />
            <Route exact path='/trips' component={Trips} />
            <Route exact path='/countries' component={Countries} />
            <Route exact path='/regions' component={Regions} />
            <Route exact path='/info' component={Info} />
            <Route exact path='/country/:id' component={Country} />
            <Route exact path='/trip/:id' component={Trip} />

            <Route path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
