import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './style.scss';

export class LoginComponent extends Component {
  render() {
    const {authUrl} = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.greeting}>
          <p className={styles.welcomeString}>Добро пожаловать в <span className={styles.ivkTitle}>Invisible VK</span></p>
          <p>IVK является клиентом для популярной социальной сети Вконтакте. Он позволяет пользоваться социальной сетью незаметно для других!</p>
          <div>
            Список функций:
            <ul className={styles.features}>
              <li>Время последнего посещения не обновляется</li>
              <li>Отправитель сообщения не знает о том, что вы прочитали его сообщение</li>
              <li>Получатель вашего сообщения не знает о том,что вы печатаете текст</li>
            </ul>
          </div>
        </div>
        <a className={styles.buttonLogin} href={authUrl}>
          <RaisedButton
            label="Войти"
            fullWidth={true}
            primary={true}/>
        </a>
      </div>
    )
  };
}

export default LoginComponent;
