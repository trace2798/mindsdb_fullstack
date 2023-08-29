<!-- Command to create a Database,
CREATE DATABASE images_generation; -->

<!-- Command to create a Model after creating a database -->
 <!-- CREATE MODEL images_generation.dalle_real_natural
 PREDICT img_url
 USING
    engine = 'openai',
    mode = 'image',
    prompt_template = '{{text}}, 8K | ultra realistic image |  natural lighting | natural colors with a bit of saturation'; -->
 <!-- short summary model
 CREATE MODEL summarize.summarize_gpt_4_short
 PREDICT response
 USING
 engine = 'openai',
 model_name = 'gpt-4',
 temperature = 0.5,
 prompt_template = '
 You are helping people by providing summary to their text, you are very smart.
 From input message: {{text}}\
 In less than 500 characters, write a brief, comprehensive, to the point summary.'; -->

<!-- Command to Drop(delete) a database
DROP DATABASE DATABASE_NAME

Command to Drop(delete) a model
DROP MODEL MODEL_NAME -->