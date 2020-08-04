import { View, loc } from 'okta';
import BaseForm from '../../internals/BaseForm';
import { isMobileDevice } from '../../../../util/BrowserFeatures';
import BaseAuthenticatorView from '../../components/BaseAuthenticatorView';
import AuthenticatorEnrollFooter from '../../components/AuthenticatorEnrollFooter';
import Link from '../../components/Link';
import { getSwitchOVEnrollChannelLink } from '../../utils/LinksUtil';
import polling from '../shared/polling';
import hbs from 'handlebars-inline-precompile';

const Body = BaseForm.extend(Object.assign(
  polling,
  {
    title () {
      const selectedChannel = this.options.appState.get('currentAuthenticator').contextualData.selectedChannel;
      let title;
      switch (selectedChannel) {
      case 'email':
        title = loc('oie.enroll.okta_verify.setup.email.title', 'login');
        break;
      case 'sms':
        title = loc('oie.enroll.okta_verify.setup.sms.title', 'login');
        break;
      default:
        title = loc('oie.enroll.okta_verify.setup.title', 'login');
      }
      return title;
    },
    className: 'oie-enroll-ov-poll',
    noButtonBar: true,
    initialize () {
      BaseForm.prototype.initialize.apply(this, arguments);
      if (isMobileDevice() &&
        this.options.appState.get('currentAuthenticator').contextualData.selectedChannel === 'qrcode') {
        this.options.appState.trigger('switchForm', 'enroll-with-another-channel');
      }
      this.listenTo(this.model, 'error', this.stopPolling);
      this.startPolling();
    },
    getUISchema () {
      const schema = [];
      const contextualData = this.options.appState.get('currentAuthenticator').contextualData;
      const selectedChannel = contextualData.selectedChannel;
      if (selectedChannel === 'qrcode') {
        schema.push({
          View: View.extend({
            template: hbs`
              <ol>
                <li>{{i18n code="oie.enroll.okta_verify.qrcode.step1" bundle="login"}}</li>
                <li>{{i18n code="oie.enroll.okta_verify.qrcode.step2" bundle="login"}}</li>
                <li>{{i18n code="oie.enroll.okta_verify.qrcode.step3" bundle="login"}}</li>
              </ol>
              <div class="qrcode-container">
                <img class="qrcode" src={{href}} alt="qr code"></img>
              </div>
            `,
            getTemplateData () {
              return {
                href: contextualData.qrcode.href,
              };
            },
          }),
        });
      } else if (selectedChannel === 'email') {
        schema.push({
          View: View.extend({
            template: hbs`
              <ol class="email-info">
                <li>{{i18n code="oie.enroll.okta_verify.email.step1" bundle="login" arguments="email"}}</li>
                <li>{{i18n code="oie.enroll.okta_verify.email.step2" bundle="login"}}</li>
                <li>{{i18n code="oie.enroll.okta_verify.email.step3" bundle="login"}}</li>
              </ol>
            `,
            getTemplateData () {
              return {
                email: contextualData.email,
              };
            },
          }),
        });
      }  else if (selectedChannel === 'sms') {
        schema.push({
          View: View.extend({
            template: hbs`
              <ol class="sms-info">
                <li>{{i18n code="oie.enroll.okta_verify.sms.step1" bundle="login" arguments="phoneNumber"}}</li>
                <li>{{i18n code="oie.enroll.okta_verify.sms.step2" bundle="login"}}</li>
                <li>{{i18n code="oie.enroll.okta_verify.sms.step3" bundle="login"}}</li>
              </ol>
            `,
            getTemplateData () {
              return {
                phoneNumber: contextualData.phoneNumber,
              };
            },
          }),
        });
      }
      if (this.options.appState.get('currentAuthenticator').contextualData.selectedChannel === 'qrcode') {
        schema.push({
          View: Link,
          options: getSwitchOVEnrollChannelLink(this.options.appState),
          selector: '.qrcode-container',
        });
      }
      return schema;
    },
    remove () {
      BaseForm.prototype.remove.apply(this, arguments);
      this.stopPolling();
    },
  },
));

export default BaseAuthenticatorView.extend({
  Body,
  Footer: AuthenticatorEnrollFooter,
});
