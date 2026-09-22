import bpy  # type: ignore
import os
import math

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    
    # Clear materials
    for mat in bpy.data.materials:
        bpy.data.materials.remove(mat)

def create_material(name, color, metallic=0.0, roughness=0.5, transmission=0.0, ior=1.45):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness
        # For Blender 4.0+, transmission is handled differently, but we'll set the property if available
        if "Transmission Weight" in bsdf.inputs:
            bsdf.inputs["Transmission Weight"].default_value = transmission
        elif "Transmission" in bsdf.inputs:
            bsdf.inputs["Transmission"].default_value = transmission
        if "IOR" in bsdf.inputs:
            bsdf.inputs["IOR"].default_value = ior
    return mat

def create_hookah():
    # Materials
    glass_mat = create_material("GlassBase", (0.8, 0.9, 1.0, 1.0), metallic=0.1, roughness=0.1, transmission=0.9)
    gold_mat = create_material("GoldStem", (1.0, 0.8, 0.3, 1.0), metallic=1.0, roughness=0.2)
    black_mat = create_material("BlackHose", (0.1, 0.1, 0.1, 1.0), metallic=0.0, roughness=0.8)
    clay_mat = create_material("ClayBowl", (0.5, 0.3, 0.2, 1.0), metallic=0.0, roughness=0.9)

    # 1. Base (Vase) - A smooth sphere slightly flattened
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1.5, location=(0, 0, 1.5))
    base = bpy.context.active_object
    base.scale[2] = 1.2
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bpy.ops.object.shade_smooth()
    base.data.materials.append(glass_mat)
    
    # Base neck
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.4, depth=1.0, location=(0, 0, 3.5))
    neck = bpy.context.active_object
    bpy.ops.object.shade_smooth()
    neck.data.materials.append(glass_mat)

    # 2. Stem - Tall thin cylinder
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.2, depth=6.0, location=(0, 0, 7.0))
    stem = bpy.context.active_object
    bpy.ops.object.shade_smooth()
    stem.data.materials.append(gold_mat)

    # Stem ornaments (rings)
    for z in [4.5, 6.0, 7.5, 9.0]:
        bpy.ops.mesh.primitive_torus_add(major_radius=0.3, minor_radius=0.1, major_segments=32, minor_segments=16, location=(0, 0, z))
        ring = bpy.context.active_object
        bpy.ops.object.shade_smooth()
        ring.data.materials.append(gold_mat)

    # 3. Tray
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=1.8, depth=0.1, location=(0, 0, 9.5))
    tray = bpy.context.active_object
    bpy.ops.object.shade_smooth()
    tray.data.materials.append(gold_mat)

    # 4. Bowl
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.6, depth=0.8, location=(0, 0, 10.0))
    bowl = bpy.context.active_object
    # Scale top face to make it look like a bowl (simple taper)
    # Since we can't easily bmesh here without more code, we'll just leave it as a cylinder for simplicity, or use a cone
    bpy.ops.object.delete() # replace with cone
    bpy.ops.mesh.primitive_cone_add(vertices=32, radius1=0.4, radius2=0.7, depth=0.8, location=(0, 0, 10.0))
    bowl = bpy.context.active_object
    bpy.ops.object.shade_smooth()
    bowl.data.materials.append(clay_mat)

    # 5. Hose connection port
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.15, depth=0.8, location=(0.4, 0, 4.5))
    port = bpy.context.active_object
    port.rotation_euler[1] = math.radians(60)
    bpy.ops.object.shade_smooth()
    port.data.materials.append(gold_mat)
    
    # Combine all into one object (optional, but good for neatness)
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.join()
    hookah = bpy.context.active_object
    hookah.name = "Hookah"
    
    # Move origin to bottom (z=0)
    bpy.ops.object.origin_set(type='ORIGIN_CURSOR')

if __name__ == "__main__":
    clear_scene()
    create_hookah()
    
    # Export to .glb
    output_path = os.path.join(os.getcwd(), "public", "models", "hookah.glb")
    # ensure dir exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    bpy.ops.export_scene.gltf(filepath=output_path, export_format='GLB', export_apply=True)
    print(f"Exported Hookah to {output_path}")
