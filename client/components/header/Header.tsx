import { FC } from "react";
import { easings, useSpring, animated } from "react-spring";
import Container from "../layout/Container";
import GroupButtons from "../layout/GroupButtons";
import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";
import classes from "./Header.module.css";

const Header: FC = () => {
  const propsHeader = useSpring({
    to: {
      opacity: 1,
      transform: "translateY(0)"
    },
    from: {
      opacity: 0,
      transform: "translateY(-60%)"
    },
    delay: 1500,
    config: { 
      duration: 1700,
      easing: easings.easeInOutQuart,
    },
    reset: true,
  });

  return (
    <animated.header 
      className={classes.header}
      style={propsHeader}
    >
      <Container>
        <div className={classes.headerInner}>
          <Logo/>
          <Navbar/>
          <GroupButtons/>
        </div>
      </Container>
    </animated.header>
  );
}
export default Header;