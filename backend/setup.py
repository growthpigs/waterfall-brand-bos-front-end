#!/usr/bin/env python3
"""
Setup script for Brand BOS Backend
"""
import os
import sys
import subprocess
from pathlib import Path


def create_env_file():
    """Create .env file from .env.example if it doesn't exist"""
    env_path = Path(".env")
    env_example_path = Path(".env.example")
    
    if not env_path.exists() and env_example_path.exists():
        print("Creating .env file from .env.example...")
        env_path.write_text(env_example_path.read_text())
        print("✅ .env file created. Please update it with your actual credentials.")
    elif env_path.exists():
        print("✅ .env file already exists.")
    else:
        print("❌ .env.example file not found!")
        return False
    return True


def create_virtual_environment():
    """Create Python virtual environment"""
    venv_path = Path("venv")
    
    if not venv_path.exists():
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
        print("✅ Virtual environment created.")
    else:
        print("✅ Virtual environment already exists.")
    return True


def install_dependencies():
    """Install Python dependencies"""
    print("Installing dependencies...")
    
    # Determine pip command based on OS
    if os.name == 'nt':  # Windows
        pip_cmd = "venv\\Scripts\\pip"
    else:  # macOS/Linux
        pip_cmd = "venv/bin/pip"
    
    # Upgrade pip first
    subprocess.run([pip_cmd, "install", "--upgrade", "pip"], check=True)
    
    # Install requirements
    subprocess.run([pip_cmd, "install", "-r", "requirements.txt"], check=True)
    print("✅ Dependencies installed.")
    return True


def create_directories():
    """Create necessary directories"""
    directories = ["logs", "uploads", "temp"]
    
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
    
    print("✅ Directories created.")
    return True


def display_next_steps():
    """Display next steps for the user"""
    print("\n" + "="*60)
    print("🎉 Brand BOS Backend Setup Complete!")
    print("="*60)
    print("\nNext steps:")
    print("1. Update .env file with your actual credentials:")
    print("   - Supabase URL and keys")
    print("   - DataForSEO password")
    print("   - API keys for integrations")
    print("   - Generate a secret key with: openssl rand -hex 32")
    print("\n2. Set up your Supabase database:")
    print("   - Create a new Supabase project")
    print("   - Run the SQL schema: backend/database/schema.sql")
    print("\n3. Activate virtual environment:")
    if os.name == 'nt':  # Windows
        print("   .\\venv\\Scripts\\activate")
    else:  # macOS/Linux
        print("   source venv/bin/activate")
    print("\n4. Run the development server:")
    print("   python main.py")
    print("\nThe API will be available at: http://localhost:8000")
    print("API documentation at: http://localhost:8000/docs")
    print("="*60)


def main():
    """Main setup function"""
    print("🚀 Setting up Brand BOS Backend...")
    
    steps = [
        ("Creating .env file", create_env_file),
        ("Creating virtual environment", create_virtual_environment),
        ("Installing dependencies", install_dependencies),
        ("Creating directories", create_directories),
    ]
    
    for step_name, step_func in steps:
        print(f"\n{step_name}...")
        if not step_func():
            print(f"❌ Failed at step: {step_name}")
            sys.exit(1)
    
    display_next_steps()


if __name__ == "__main__":
    main()