import React from 'react';

type ManageSubscriptionProps = {
  customerId: string;
};

export const ManageSubscription = ({ customerId }: ManageSubscriptionProps) => {
  return (
    <section>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>ArcMind AI Subscription</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="customerId"
          name="customerId"
          value={customerId}
        />
        <button id="portal-button" type="submit">
          Manage your subscription
        </button>
      </form>
    </section>
  );
};
