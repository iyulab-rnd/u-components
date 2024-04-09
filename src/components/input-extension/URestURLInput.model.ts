import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export type RestMethod = "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "OPTIONS" | "TRACE" | "PATCH" | "CONNECT";

/**
 * Represents the value of a REST URL input.
 */
export interface RestURLValue {
  /**
   * The HTTP method to be used for the request.
   */
  method: RestMethod;

  /**
   * The URL for the REST request.
   */
  url?: string;
}

/**
 * Represents the model for a REST URL input component.
 */
export interface URestURLInputModel extends UBaseInputModel {
  /**
   * The list of HTTP methods that can be used for the request.
   */
  methods: RestMethod[];

  /**
   * The initial value for the input field.
   */
  value?: RestURLValue;
}