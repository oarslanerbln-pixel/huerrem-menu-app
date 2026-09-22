import shutil
import os

source_dir = r"C:\Users\oarsl\.gemini\antigravity-ide\brain\838e33ce-8979-4d23-991c-7b03f921bf37"
dest_dir = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\shisha"

files_to_copy = {
    # Batch 1
    "shisha_apple_mint_1780864343889.png": "shisha_concept_apple_mint.png",
    "shisha_black_nana_1780864354616.png": "shisha_concept_black_nana.png",
    "shisha_sternstaub_1780864364839.png": "shisha_concept_sternstaub.png",
    "shisha_luftschloss_1780864375554.png": "shisha_concept_luftschloss.png",
    "shisha_lime_mint_1780864385060.png": "shisha_concept_lime_mint.png",
    
    # Batch 2
    "shisha_blueberry_1780864403702.png": "shisha_concept_blueberry.png",
    "shisha_nasty_girl_1780864413220.png": "shisha_concept_nasty_girl.png",
    "shisha_peach_mint_1780864424704.png": "shisha_concept_peach_mint.png",
    "shisha_falim_red_1780864435635.png": "shisha_concept_falim_red.png",
    "shisha_ice_kaktus_1780864446264.png": "shisha_concept_ice_kaktus.png",
    
    # Batch 3
    "shisha_african_queen_1780864467012.png": "shisha_concept_african_queen.png",
    "shisha_raffaello_1780864478575.png": "shisha_concept_raffaello.png",
    "shisha_ice_apfel_1780864488624.png": "shisha_concept_ice_apfel.png",
}

for src_name, dest_name in files_to_copy.items():
    src_path = os.path.join(source_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} to {dest_name}")
    else:
        print(f"File not found: {src_path}")
