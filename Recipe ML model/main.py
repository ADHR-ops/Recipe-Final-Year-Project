from trans_model import generation_function
items ="macaroni, butter, salt, bacon, milk, flour, pepper, cream corn"

generated = generation_function(items)

for text in generated:
    sections = text.split("\n")
    for section in sections:
        section = section.strip()
        if section.startswith("title:"):
            section = section.replace("title:", "")
            headline = "TITLE"
        elif section.startswith("ingredients:"):
            section = section.replace("ingredients:", "")
            headline = "INGREDIENTS"
        elif section.startswith("directions:"):
            section = section.replace("directions:", "")
            headline = "DIRECTIONS"
        
        if headline == "TITLE":
            print(f"[{headline}]: {section.strip().capitalize()}")
        else:
            section_info = [f"  - {i+1}: {info.strip().capitalize()}" for i, info in enumerate(section.split("--"))]
            print(f"[{headline}]:")
            print("\n".join(section_info))

    print("-" * 130)
