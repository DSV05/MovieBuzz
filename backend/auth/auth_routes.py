from fastapi import APIRouter, Request
from pymongo import MongoClient
import bcrypt
import random
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText

auth_router = APIRouter()

# 🔵 MongoDB Atlas
client = MongoClient("mongodb+srv://siddivinayakdoppalapudi_db_user:rY1kKu1yYZ4Sa1me@cluster0.cjznp5z.mongodb.net/?retryWrites=true&w=majority")
db = client["moviebuzz"]
users = db["users"]


# 🔵 OTP generator
def generate_otp():
    return str(random.randint(100000, 999999))


# 🔵 SEND EMAIL FUNCTION
def send_otp_email(receiver_email, otp):
    sender_email = "moviebuzzspd@gmail.com"
    app_password = "dbsf kiuf pvwy qofe"   # gmail app password

    subject = "MovieBuzz OTP Verification"
    body = f"Your OTP is: {otp}"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("OTP email sent to", receiver_email)
    except Exception as e:
        print("Email error:", e)


# 🔵 SIGNUP
@auth_router.post("/signup")
async def signup(request: Request):
    data = await request.json()

    name = data["name"]
    email = data["email"]
    password = data["password"]

    existing = users.find_one({"email": email})
    if existing:
        return {"msg": "Email already exists"}

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    otp = generate_otp()

    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed,
        "verified": False,
        "otp": otp,
        "otp_expiry": datetime.utcnow() + timedelta(minutes=5)
    })

    send_otp_email(email, otp)

    return {"msg": "OTP sent to your email"}


# 🔵 VERIFY OTP (SAFE VERSION)
@auth_router.post("/verify-otp")
async def verify_otp(request: Request):
    data = await request.json()

    email = data["email"]
    otp = data["otp"]

    user = users.find_one({"email": email})

    if not user:
        return {"msg": "User not found"}

    # already verified
    if user.get("verified"):
        return {"msg": "Already verified. Please login."}

    # otp missing
    if "otp" not in user:
        return {"msg": "OTP expired. Register again."}

    # expiry check
    if datetime.utcnow() > user.get("otp_expiry"):
        return {"msg": "OTP expired"}

    if user["otp"] != otp:
        return {"msg": "Invalid OTP"}

    users.update_one(
        {"email": email},
        {
            "$set": {"verified": True},
            "$unset": {"otp": "", "otp_expiry": ""}
        }
    )

    return {"msg": "Account verified"}


# 🔵 LOGIN
@auth_router.post("/login")
async def login(request: Request):
    data = await request.json()

    email = data["email"]
    password = data["password"]

    user = users.find_one({"email": email})

    if not user:
        return {"msg": "User not found"}

    if not user.get("verified"):
        return {"msg": "Verify OTP first"}

    if not bcrypt.checkpw(password.encode(), user["password"]):
        return {"msg": "Wrong password"}

    return {
        "msg": "Login successful",
        "name": user["name"],
        "email": user["email"]
    }


# 🔵 TEST
@auth_router.get("/test")
def test():
    return {"status": "auth working"}
