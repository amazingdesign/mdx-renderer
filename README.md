# MDX RENDERER

## Usage

### Render forom database

This app can fetch content form REST API.

The endpoint with content should be set in `.env` as `CONTENT_ENDPOINT`.

It should be a GET endpoint (`https://example.com/contenr/:contentId`) that returns JSON:

```json
{
  "content": "# MDX Content"
}
```

When endpoint is set app will render content when receives GET on 

```
/:contentId
```

### Temporary render

You can send POST request on `/api/tmpMDX` endpoint with JSON body with:

```json
{
  "content": "# MDX Content"
}
```

App will save content in temporary db, and respond in JSON with new db entry containing `_id` field.

You can use this `_id` field to render this content once using `/tmp/:_id`.

After render the tmp content is deleted (second request on `/tmp/:_id` will return 404).

Tmp content is deleted after 5 minutes (default). You can set it in `.env` file.

## Config

All config variables are in `.env` file. In repo there is `.env.example` with all variable names.

```env
# Should app delete tmp content (default true)
TMP_CONTENT_DELETE=
# How long tmp content will be stored (default 300000 = 5 minutes)
TMP_CONTENT_DELETE_TIME=

# (default empty)
CONTENT_ENDPOINT=
```

## Own components

You can add own components in in

```
src/components/mdxComponents
```

All components exported form 


```
src/components/mdxComponents/index.js
```

Will we in scope of .mdx file.
