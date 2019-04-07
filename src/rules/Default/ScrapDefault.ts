import { ReactTinyLinkType } from '../../ReactTinyLinkTypes';
import { isEmpty, getTitleOfDoc, getAttrOfDocElement, fixRelativeUrls } from "../utils";

export default async (url, htmlDoc) => {
  let baseUrl = getAttrOfDocElement(htmlDoc, "base", 'href');
  if (!baseUrl) {
    baseUrl = url;
  }

  return {
    title: getTitleOfDoc(htmlDoc),
    content: getAttrOfDocElement(
      htmlDoc,
      "meta[name='description']",
      'content',
    ),
    url: getAttrOfDocElement(htmlDoc, "meta[property='og:url']", 'content'),
    description: getAttrOfDocElement(
      htmlDoc,
      "meta[name='description']",
      'content',
    ),
    video: [],
    image: [
      getAttrOfDocElement(htmlDoc, 'meta[property="og:logo"]', 'content'),
      getAttrOfDocElement(htmlDoc, 'meta[itemprop="logo"]', 'content'),
      getAttrOfDocElement(htmlDoc, 'img[itemprop="logo"]', 'src'),
      getAttrOfDocElement(htmlDoc, "meta[property='og:image']", 'content'),
      getAttrOfDocElement(htmlDoc, 'img[class*="logo" i]', 'src'),
      getAttrOfDocElement(htmlDoc, 'img[src*="logo" i]', 'src'),
      getAttrOfDocElement(
        htmlDoc,
        'meta[property="og:image:secure_url"]',
        'content',
      ),
      getAttrOfDocElement(htmlDoc, 'meta[property="og:image:url"]', 'content'),
      getAttrOfDocElement(htmlDoc, 'meta[property="og:image"]', 'content'),
      getAttrOfDocElement(htmlDoc, 'meta[name="twitter:image:src"]', 'content'),
      getAttrOfDocElement(htmlDoc, 'meta[name="twitter:image"]', 'content'),
      getAttrOfDocElement(htmlDoc, 'meta[itemprop="image"]', 'content'),
    ].filter(i => !isEmpty(i)).map((i => fixRelativeUrls(baseUrl, i))),
    type: ReactTinyLinkType.TYPE_DEFAULT, // MIME Type
  };
};