import React from 'react';

import style from './Header.module.css';

export const Header = () => {
  return (
    <section>
      <div className={style.header}>
        <div className={style.title}>ArcMind AI</div>
      </div>
      <h1 className={style.subtitle}>alpha v0.2</h1>
    </section>
  );
};
