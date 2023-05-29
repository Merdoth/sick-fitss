import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <p>I am a Page component</p>

      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
