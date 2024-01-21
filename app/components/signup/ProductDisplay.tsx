import React from 'react';
import { Button } from '../library/Button';
import { Card } from 'flowbite-react';
import { CheckCircle } from '../icons';

type PricingCardProps = {
  title: string;
  price: number;
};

const PricingCard = ({ title, price }: PricingCardProps) => {
  return (
    <Card className="max-w-sm">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /month
        </span>
      </div>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <CheckCircle />
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            500 chain of thoughts
          </span>
        </li>
        <li className="flex space-x-3">
          <CheckCircle />
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            Early access of new features
          </span>
        </li>
      </ul>
      <Button id="checkout-and-portal-button" type="submit">
        Choose plan
      </Button>
    </Card>
  );
};

export const ProductDisplay = () => (
  <section>
    <form action="/create-checkout-session" method="POST">
      <PricingCard title="Starter" price={5} />
      {/* Add a hidden field with the lookupKey of your Price */}
      <input type="hidden" name="lookupKey" value="{{PRICE_LOOKUP_KEY}}" />
    </form>
  </section>
);
