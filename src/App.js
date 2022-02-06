import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Commissions from "./pages/commissions";
import {Header} from './components/header';
import { Navigation } from "./components/navigation";
import "./App.css";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { useState, useEffect } from "react";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  const bgColor = new URLSearchParams(window.location.search).get("theme") === 'light' ? '#ffffff' : '#111111';

  document.body.style.backgroundColor = bgColor;
  return (
    <Router>
      <div>
        {window.location.href.indexOf('pay') === -1 ?
        (
          <div>
          <Navigation />
          </div>) : null
        }

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pay">
            <Pay />
          </Route>
          <Route path="/commissions">
            <Commissions />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function Home() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery}/>
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
}

function Pay() {
  const stripePromise = loadStripe(
    "pk_test_51IcbRZKWjn1TKO12haUWGetyIZSALgjkAbIUywM6gxRDYu3cpxehym5ZQxNcGTDPVOvp5Cm2MOayhOurFmjO4Bhk004uJWLWJp"
  );

  const sessionId = new URLSearchParams(window.location.search).get("sessionId")
  const customerEmail = new URLSearchParams(window.location.search).get("customerEmail")
  const ship = !!(new URLSearchParams(window.location.search).get("ship"));

  if(sessionId){
    stripePromise.then(stripe => {
      const options = {
        sessionId,
      };
      if(customerEmail){
        options.customerEmail = customerEmail;
      }
      if(ship){
        options.shippingAddressCollection = ['US'];
      }
      stripe.redirectToCheckout({
        sessionId,
      });
    
    });  
  }

  return (
    <div>
    </div>
  );
}