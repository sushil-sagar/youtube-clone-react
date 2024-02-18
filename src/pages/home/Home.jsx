
import PropTypes from 'prop-types'; // Import PropTypes
import Feed from "../../components/Feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useState } from 'react';

const Home = ({ sidebar }) => {

  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : 'large-container'}`}>
        <Feed category={category} />
      </div>
    </>
  )
}

// Add propTypes validation
Home.propTypes = {
  sidebar: PropTypes.bool.isRequired, // Validate sidebar as a boolean
};

export default Home;
