import React from 'react';
import Screen from '../../core/screen';
import QuickAuthPane from '../../ui/pane/quick_auth_pane';
import { logIn } from '../../quick-auth/actions';
import { renderSignedInConfirmation } from '../../core/signed_in_confirmation';
import * as l from '../../core/index';
import { quickAuthConnection } from '../enterprise';


function icon(strategy) {
  if (strategy === "google-apps") return strategy;
  if (~["adfs", "office365", "waad"].indexOf(strategy)) return "windows";
  return "auth0";
}

const Component = ({model, t}) => {
  const headerText = t("headerText") || null;
  const header = headerText && <p>{headerText}</p>;

  return (
    <QuickAuthPane
      buttonLabel={t("loginTo", {domain: quickAuthConnection(model).get("domain"), __textOnly: true})}
      buttonClickHandler={e => logIn(l.id(model), quickAuthConnection(model))}
      header={header}
      strategy={icon(quickAuthConnection(model).get("strategy"))}
    />
  );
};

export default class QuickAuthScreen extends Screen {

  constructor() {
    super("enterpriseQuickAuth");
  }

  renderAuxiliaryPane(lock) {
    return renderSignedInConfirmation(lock);
  }

  render() {
    return Component;
  }

}
