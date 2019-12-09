import React, { useState } from 'react';
import './App.css';
import { useSpring, animated as a } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, /* sets the value of s --> */ 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const App = () => {

  // Flipper
  const [flipped, setFlip] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: /* perspective adds the outward part of the flip */ `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
    /* refer to react-springs config docs, they have a great demo of these values ^^^ */
  })

  // Toggles
  const [toggle, setToggle] = useState(false)
  const spring = useSpring({
    config: {
      duration: 2000
    },
    opacity: toggle ? 1 : 0
  })
  const colors = useSpring({
    background: toggle ? 'blue' : 'red'
  })

  // Zoomer
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  // passing the array sets the values of x, y, and s respectively

  return (
    <div className="App">
      <div>

        {/* Flipper */}
        <div onClick={() => setFlip(state => !state)}>
          {/* the interpolate helper function allows you to take multiple animated values and form one interpolation result */}
          <a.div className="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }} />
          <a.div className="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
        </div>

        <hr />
        <hr />

        {/* Toggles */}
        <a.h1 style={spring}>Hello World</a.h1>
        <a.div style={colors} className="box"></a.div>
        <button onClick={() => setToggle(!toggle)}>Click</button>

        <hr />
        <hr />

        {/* Zoomer */}
        <a.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
        />

      </div>
    </div>
  );
}

export default App;
