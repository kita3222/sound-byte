import json
import os
import openai
from newspaper import Article

def handler(event, context):
  arguments = event.get("arguments")
  url = arguments.get("url")

  openai.api_key = os.environ["GPT_API_KEY"]

  if not url:
    raise Exception("The attribute url is required.")

  if not openai.api_key:
    raise Exception("There is a missing environment variable.")

  try:
    article = Article(url)
    article.download()
    article.parse()

    title = article.title

    text = article.text

    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": f"The following is the text of a news article. Please summarize this sentence in plain English.{text}"}])

    return {
      "summaryText": chat_completion["choices"][0]["message"]["content"],
      "title": title
    }
  except Exception as err:
    print(err)
    raise Exception("internal server error")

