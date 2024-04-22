import React from 'react';
import { createComponent } from '@lit/react';

type Constructor<T> = { new (): T };

type EventName<T extends Event = Event> = string & { __eventType: T };

type EventNames = Record<string, EventName | string>;

interface LitOptions<I extends HTMLElement, E extends EventNames = {}> { // eslint-disable-line
  tagName: string;
  elementClass: Constructor<I>;
  events?: E;
}

/**
 * Converts a Lit Element to a React Component.
 * @param option - The options for the conversion.
 * @returns The converted React Component.
 */
export function convertReact<I extends HTMLElement, E extends EventNames = {}> // eslint-disable-line
  (option: LitOptions<I, E>) 
{
  return createComponent({
    react: React,
    elementClass: option.elementClass,
    tagName: option.tagName,
    events: option.events || {},
  });
}