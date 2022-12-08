import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { mockUser } from "@/mocks/datasource/mockDataSource";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

export const authHandler = [
  rest.get(`${baseUrl}/auth/github`, (req, res, ctx) => {
    const code = req.url.searchParams.get("code");
    if (code != null) {
      return res(ctx.status(200), ctx.delay(1000), ctx.json(mockUser));
    }
  }),
  rest.delete(`${baseUrl}/auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${baseUrl}/auth/refresh`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        expiresIn: 1669293441000,
        accessToken: 123545,
      })
    );
  }),
  rest.get(`${baseUrl}/auth/s3-url`, (req, res, ctx) => {
    const count = req.url.searchParams.get("imageCount");
    return res(
      ctx.status(200),
      ctx.json(
        Array.from({ length: Number(count) }, () => ({
          url: "url",
          fields: {
            Key: "hahahoho",
            ACL: "hahahoho",
            bucket: "hahahoho",
            "X-Amz-Algorithm": "hahahoho",
            "X-Amz-Credential": "hahahoho",
            "X-Amz-Date": "hahahoho",
            "X-Amz-Signature": "hahahoho",
            Policy: "hahahoho",
          },
        }))
      )
    );
  }),
];
