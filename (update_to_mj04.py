import os
import json

# نیا اور واحد برانڈ نام
UNIFIED_BRAND_NAME = "MJ04"

# آپ کے پراجیکٹس کی ڈائریکٹری (جہاں تمام فائلیں موجود ہیں)
PROJECTS_ROOT_DIR = "./projects"

def update_metadata_files(directory):
    print(f"🔄 تمام پروجیکٹس کا نام تبدیل ہو کر '{UNIFIED_BRAND_NAME}' کیا جا رہا ہے...")
    
    updated_count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            # صرف JSON یا کنفیگریشن یا سورس فائلز کو ٹارگٹ کریں
            if file.endswith(('.json', '.env', '.js', '.py', '.html', '.md')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # پرانے ناموں یا ہولڈر کو MJ04 سے ریپلیس کرنا
                    # (یہاں آپ اپنے پرانے ناموں کی جگہ دے سکتے ہیں)
                    new_content = content.replace("Jamil Ahmed Kalyal", UNIFIED_BRAND_NAME)
                    new_content = new_content.replace("sdn-news", "mj04-news")
                    
                    if content != new_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"✅ اپ ڈیٹ ہو گئی فائل: {file_path}")
                        updated_count += 1
                except Exception as e:
                    # بعض بائنری یا انکوڈنگ فائلز کو چھوڑنے کے لیے
                    continue

    print(f"\n🎉 کل {updated_count} فائیلز کامیابی سے '{UNIFIED_BRAND_NAME}' کے نام پر اپ ڈیٹ کر دی گئی ہیں!")

if __name__ == "__main__":
    update_metadata_files(PROJECTS_ROOT_DIR)
