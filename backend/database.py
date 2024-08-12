from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Corrected connection string with URL-encoded '@' symbol in the password
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:EB199944%40mysql.com@localhost:3306/appreact"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
