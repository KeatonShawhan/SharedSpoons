/*
#######################################################################
#
# Copyright (C) 2022-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

// Your "global" types go here

/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}
 * @example "529b7745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;

/**
 * Stringified URL.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern ^https?://(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})*(:[0-9]+)?(/[\w./?%&=-]*)?$
 * @example "https://communications.ucsc.edu/wp-content/uploads/2016/11/ucsc-seal.jpg"
 */
export type URLString = string;

// add id to this
export type SessionUser = {
    id: UUID,
    email: string,
    name: string
  }
  
  declare global {
    namespace Express {
      export interface Request {
        user?: SessionUser;
      }
    }
  }
